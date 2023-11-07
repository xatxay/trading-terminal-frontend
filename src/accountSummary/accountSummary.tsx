import { useFetch } from "../utils/utils";
import "../body/bodyStyle.css";
import { AccountSummaryInterface } from "../utils/interface";

const AccountSummary = () => {
  const { data: accountSummary, error } = useFetch<AccountSummaryInterface>(
    "http://localhost:5000/accountSummary"
  );
  console.log(accountSummary);

  if (error) return <p>Error: {error}</p>;

  return (
    <div className="account-summary">
      {accountSummary ? (
        <ul>
          <li>
            <span className="label-color">Account Balance </span>
            <span className="value-color">
              {accountSummary.totalEquity.toFixed(2)}
            </span>
          </li>
          <li>
            <span className="label-color">Margin Balance </span>
            <span className="value-color">
              {accountSummary.totalMarginBalance.toFixed(2)}
            </span>
          </li>
          <li>
            <span className="label-color">Available Balance </span>
            <span className="value-color">
              {accountSummary.totalAvailableBalance.toFixed(2)}
            </span>
          </li>
          <li>
            <span className="label-color">Unrealize PNL </span>
            <span className="value-color">
              {accountSummary.totalPerpUPL.toFixed(2)}
            </span>
          </li>
        </ul>
      ) : (
        <p>No account balance found</p>
      )}
    </div>
  );
};

export default AccountSummary;
