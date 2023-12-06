import { useFetch } from "../utils/utils";
import { AccountSummaryInterface } from "../utils/interface";
import {
  AccountSummaryStyle,
  ValueColor,
  LabelColor,
} from "./accountSummaryStyle";
import { ErrorStyle } from "../loginPage/loginStyle";

const AccountSummary = () => {
  const { data: accountSummary, error } = useFetch<AccountSummaryInterface>(
    String(process.env.REACT_APP_ACCOUNT),
    1000
  );

  console.log("data, error: ", accountSummary, error);

  if (!accountSummary?.totalAvailableBalance) return <></>;

  if (error) return <ErrorStyle>{error}</ErrorStyle>;

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
