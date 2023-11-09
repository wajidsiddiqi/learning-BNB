import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
  useAccount,
} from "wagmi";
import { ConnectKitButton } from "connectkit";
import Image from "next/image";
import {
  StyledButton,
  StyledConnectButton,
  Modal,
  ErrorMsg,
  ErrorContainer,
  CloseIcon,
  SuccessContainer,
  Modal2,
  SuccessMsg,
} from "@/app/styles/styles.js";
import Contract from "../FloraPixel.json";

const price = ethers.parseEther("0.01");

export default function Mint({ quantity }) {
  const { isConnected } = useAccount();
  const [isErrorSeen, setIsErrorSeen] = useState(false);
  const [isSucSeen, setIsSucSeen] = useState(false);

  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: Contract.address,
    abi: Contract.abi,
    functionName: "mint",
    args: [quantity],
    value: BigInt(price.toString()) * BigInt(quantity),
  });

  const { data, error, isError, write } = useContractWrite(config);
  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  useEffect(() => {
    if (isPrepareError || isError) {
      setIsErrorSeen(true);
    }

    if (isSuccess) {
      setIsSucSeen(true);
    }
  }, [isPrepareError, isError, isSuccess]);

  function handleError(error) {
    if (error) {
      const errorMsg = error?.message;
      if (errorMsg.includes("InsufficientFundsError")) {
        return "Insufficient funds to perform this operation.";
      }
      if (errorMsg.includes("User rejected the request")) {
        return "MetaMask Tx Signature: User denied transaction signature";
      }
      if (errorMsg.includes("transaction exceeds the balance of the account")) {
        return "The total cost (gas * gas fee + value) of executing this transaction exceeds the balance of the account. This error could arise when the account does not have enough funds to: - pay for the total gas fee, - pay for the value to send.";
      }
      if (errorMsg.includes("Contract Call")) {
        const errorLines = errorMsg.split("\n");
        let output = "";
        for (let i = 0; i < errorLines.length; i++) {
          if (errorLines[i].startsWith("Contract Call")) {
            break;
          }
          output += errorLines[i] + "\n";
        }
        return output;
      } else {
        console.error(error);
        return "An error occurred while executing the contract function.";
      }
    }
  }

  return (
    <React.Fragment>
      {isConnected ? (
        <StyledButton disabled={!write || isLoading} onClick={write}>
          {isLoading ? (
            <Image
              src="/assets/icons/dot_loader.svg"
              width="36"
              height="36"
              alt="loading"
            />
          ) : (
            "Mint Now"
          )}
        </StyledButton>
      ) : (
        <ConnectKitButton.Custom>
          {({ show }) => {
            return (
              <StyledConnectButton onClick={show}>Mint Now</StyledConnectButton>
            );
          }}
        </ConnectKitButton.Custom>
      )}

      {(isPrepareError || isError) && (
        <Modal $isErrorSeen={isErrorSeen}>
          <ErrorContainer $isErrorSeen={isErrorSeen}>
            <ErrorMsg>
              <CloseIcon onClick={() => setIsErrorSeen(false)}>X</CloseIcon>
              {handleError(prepareError || error)}
            </ErrorMsg>
          </ErrorContainer>
        </Modal>
      )}

      {isSuccess && (
        <Modal2 $isSucSeen={isSucSeen}>
          <SuccessContainer $isSucSeen={isSucSeen}>
            <SuccessMsg>
              <CloseIcon onClick={() => setIsSucSeen(false)}>X</CloseIcon>
              You have successfully minted NFT!
              <br />
              View on{" "}
              <a
                href={`https://testnet.bscscan.com/tx/${data?.hash}`}
                target="_blank"
                style={{
                  textDecoration: "none",
                  color: "#21325b",
                }}
              >
                BscScan
              </a>
            </SuccessMsg>
          </SuccessContainer>
        </Modal2>
      )}
    </React.Fragment>
  );
}
