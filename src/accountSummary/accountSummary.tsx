import { useFetch } from "../utils/utils";
import { AccountSummaryInterface } from "../utils/interface";
import {
  AccountSummaryStyle,
  ValueColor,
  LabelColor,
} from "./accountSummaryStyle";

const AccountSummary = () => {
  const { data: accountSummary, error } = useFetch<AccountSummaryInterface>(
    "http://localhost:5000/accountSummary",
    3000
  );

  if (error) return <p>Error: {error}</p>;

  return (
    <AccountSummaryStyle>
      {accountSummary ? (
        <ul>
          <li>
            <LabelColor>Account Balance</LabelColor>
            <ValueColor>{accountSummary.totalEquity.toFixed(2)}</ValueColor>
          </li>
          <li>
            <LabelColor>Margin Balance</LabelColor>
            <ValueColor>
              {accountSummary.totalMarginBalance.toFixed(2)}
            </ValueColor>
          </li>
          <li>
            <LabelColor>Available Balance</LabelColor>
            <ValueColor>
              {accountSummary.totalAvailableBalance.toFixed(2)}
            </ValueColor>
          </li>
          <li>
            <LabelColor>Unrealize PNL</LabelColor>
            <ValueColor>{accountSummary.totalPerpUPL.toFixed(2)}</ValueColor>
          </li>
        </ul>
      ) : (
        <p>No account balance found</p>
      )}
    </AccountSummaryStyle>
  );
};

export default AccountSummary;
