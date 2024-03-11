import styled, { css } from "styled-components";

export const DashboardContainer = styled.div`
  width: 100%;
`;

export const CardValuesContainer = styled.div`
  display: flex;
  gap: 15px;
  width: 100%;
  padding: 0 15px;
  justify-content: center;
  margin: 60px auto;
  overflow-x: scroll;

  @media (max-width: 693px) {
    justify-content: flex-start;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const NoTransactionsContainer = styled.div`
  display: flex;
  max-width: 100%;
  justify-content: center;
  margin: 0 15px;
`;

export const TransactionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
