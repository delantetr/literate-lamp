import React from 'react';

const List = ({ me, items }) => {
  if (!items) {
    return <h3>No Items Yet</h3>;
  }

  return (
    <div>
      {me &&
        me.items.map((items) => (
          <div key={me.item._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {me.items} <br />
            </h4>
          </div>
        ))}
    </div>
  );
};
export default List;