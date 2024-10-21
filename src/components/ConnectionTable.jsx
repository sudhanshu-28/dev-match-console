const ConnectionTable = ({ connectionsList = [] }) => {
  return (
    <div className="overflow-x-auto">
      {!connectionsList || connectionsList.length === 0 ? (
        <tr>{`No connections found.`}</tr>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>{`Name`}</th>
              <th>{`Description`}</th>
              <th>{`Skills`}</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {connectionsList.map((record) => {
              const {
                _id,
                firstName,
                lastName,
                photoUrl,
                age,
                gender,
                about,
                skills = [],
              } = record;

              const fullName = `${firstName} ${lastName}`;
              const skillsString = skills.join(", ") || "-";

              return (
                <tr key={_id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img src={photoUrl} alt={fullName} />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{fullName}</div>
                        <div className="text-sm opacity-75">
                          {gender && age ? `${gender} - ${age}` : null}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-ghost badge-md">{about}</span>
                  </td>
                  <td>
                    <span className="badge badge-ghost badge-md">
                      {skillsString}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ConnectionTable;
