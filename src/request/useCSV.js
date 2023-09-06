import { useEffect, useState } from "react";
import { getData } from "./api";
/**
 * This is used to abstract the data fetching logic from the component.
 * I prefer to create custom hooks instead of using useEffects to fetch data in the component.
 * This treats the call more like a query and allows for more flexibility in the future.
 * 
 * @returns {Array} data
 */
const useCSV = (props) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getCsvData = async () => {
      const response = await getData();
      setData(response);
    }
    getCsvData();
  }, [])

  return data;
};

export default useCSV;