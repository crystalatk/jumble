import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import AppliedIcon from "./AppliedIcon";

const AppliedListItem = ({ userID, appliedList, setAppliedList, job }) => {
  const [appliedIcon, setAppliedIcon] = useState(
    "/icons/checkbox-blank-line.png"
  );
  const [isApplied, setIsApplied] = useState(true);

  useEffect(() => {
    setIsApplied(appliedList.some((applied) => applied.job_id === job.job_id));
  }, [appliedList]);

  useEffect(() => {
    setAppliedIcon(
      isApplied ? "/icons/checkbox-fill.png" : "/icons/checkbox-blank-line.png"
    );
  }, [isApplied]);

  return (
    <>
      <li className="card">
        <Link data-testid={job.id} to={`/app/${job.job_id}`}>
          <div className="card-header">
            <img src={job.company_logo} alt="Company Logo" className="logo" />
            <br />
            <AppliedIcon
              userID={userID}
              isApplied={isApplied}
              job={job}
              jobID={job.job_id}
              appliedList={appliedList}
              setAppliedList={setAppliedList}
              appliedIcon={appliedIcon}
            />
            <br />
          </div>
          <div className="card-body">
            <strong>{job.title}</strong>
            <h6>@ {job.company}</h6>
          </div>
        </Link>
      </li>
    </>
  );
};

export default AppliedListItem;
