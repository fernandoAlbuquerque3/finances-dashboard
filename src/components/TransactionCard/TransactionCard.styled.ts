import styled from "styled-components";
import { ArrowCircleUp, ArrowCircleDown } from "@phosphor-icons/react";

import { TransactionCardProps } from './index';

export const TransactionCard = styled.div<TransactionCardProps>`
   display: flex;
   width: 80%;
   margin: 10px auto;
   flex-direction: column;

   >div {
      display: flex;
      align-items: center;
      padding: 0 15px;
      max-width: 100%;
      height: 60px;
      margin: 15px 0;
      border-radius: 15px;
      cursor: pointer;
      background-color: ${({ theme }) => theme.COLORS.neutral900};

      >div {
         display: flex;
         width: 100%;
         justify-content: space-between;
         padding: 0 16px;
         color: #c4c4c4;
      }

   }

   >p {
      color: ${({ theme }) => theme.COLORS.neutral300};
   }
`

export const Entrace = styled.span`
   color: ${({ theme }) => theme.COLORS.green600};
   font-weight: 600;
`;

export const OutFlow = styled.span`
   color: ${({ theme }) => theme.COLORS.red700};
   font-weight: 600;
`;

export const CashOutFlowIcon = styled(ArrowCircleDown).attrs({
   size: 30,
})`
color: ${({ theme }) => theme.COLORS.red700};
`

export const CashEntraceIcon = styled(ArrowCircleUp).attrs({
   size: 30,
})`
color: ${({ theme }) => theme.COLORS.green600};
`;