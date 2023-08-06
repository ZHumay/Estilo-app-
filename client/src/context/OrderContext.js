import React, { createContext, useState ,useEffect } from 'react';
export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
    const [myorders, setmyorders] = useState(() => {
        const storedItems = localStorage.getItem('myorders');
        return storedItems ? JSON.parse(storedItems) : [];
    });

   
    useEffect(() => {
        localStorage.setItem('myorders', JSON.stringify(myorders));
      }, [myorders]);
    
      
      const addOrder = (order) => {
        setmyorders([...myorders, order]);

      };


    return (
        <OrderContext.Provider value={{ myorders, addOrder }}>
            {children}
        </OrderContext.Provider>
    );
};