import React from 'react';
import { useQuery } from '@apollo/client';

import ShoppingListForm from '../components/ShoppingListForm';
import List from '../components/List';

import { QUERY_ME } from '../utils/queries';


const ShoppingList= () => {
  const { loading, data } = useQuery(QUERY_ME);
  const me = data?.me || [];

  return (
      <main>
        <div className="flex-row justify-center">
        <h1>Your Shopping List</h1>
          <div
            className="col-12 col-md-10 mb-3 p-3"
            style={{ border: '1px dotted #1a1a1a' }}
          >
            <ShoppingListForm />
          </div>
          <div className="col-12 col-md-8 mb-3">
            {loading ? (
              <div>Loading...</div>
            ) : (
              <List
                list={me.shoppingList}
                title="Your Shopping List"
              />
            )}
          </div>
        </div>
      </main>
    );
  };

export default ShoppingList;
