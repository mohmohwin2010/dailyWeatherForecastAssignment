import { useCallback, useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoApiOptions } from "../api";
const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

  //original start
  // const loadOptions = (inputValue) => {
  //   fetch(
  //     // `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
  //     `${GEO_API_URL}/cities?minPopulation=100&namePrefix=${inputValue}`,
  //     geoApiOptions
  //   )
  //     .then((response) => response.json())
  //     .then((response) => {
  //       return {
  //         options: response.data.map((city) => {
  //           return {
  //             value: `${city.latitude} ${city.longitude}`,
  //             label: `${city.name}, ${city.countryCode}`,
  //           };
  //         }),
  //       };
  //     })
  //     .catch((err) => console.error(err));
  // };
  //original end

  //update with axios start
  // const response = await fetch(`/awesome-api-url/?search=${search}&offset=${loadedOptions.length}`);
  // const responseJSON = await response.json();

  // return {
  //   options: responseJSON.results,
  //   hasMore: responseJSON.has_more,
  // };
  const loadOptions = async (inputValue) => {
    const response = await fetch(
      `${GEO_API_URL}/cities?minPopulation=100&namePrefix=${inputValue}`,
      geoApiOptions
    );
    const responseJSON = await response.json();
    // console.log("json object : ", responseJSON.data);
    //   return {
    //   options: responseJSON.results,
    // };
    return {
      options: responseJSON.data.map((city) => {
        return {
          value: `${city.latitude} ${city.longitude}`,
          label: `${city.name}, ${city.countryCode}`,
        };
      }),
    };
  };
  //update end

  // const loadOptions = (inputValue) => {
  //   fetch(
  //     // `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
  //     `${GEO_API_URL}/cities?minPopulation=100&namePrefix=${inputValue}`,
  //     geoApiOptions
  //   )
  //     .then((response) => response.json())
  //     .then((response) => {
  //       return {
  //         options: response.data.map((city) => {
  //           return {
  //             value: `${city.latitude} ${city.longitude}`,
  //             label: `${city.name}, ${city.countryCode}`,
  //           };
  //         }),
  //       };
  //     })
  //     .catch((err) => console.error(err));
  // };

  // let loadOptions = useCallback((inputValue) => {
  //   fetch(
  //     // `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
  //     `${GEO_API_URL}/cities?minPopulation=100&namePrefix=${inputValue}`,
  //     geoApiOptions
  //   )
  //     .then((response) => response.json())
  //     // .then((response) => console.log(response))
  //     .then((response) => {
  //       // setOptionData(
  //       //   response.data.map((city) => {
  //       //     return {
  //       //       value: `${city.latitude} ${city.longitude}`,
  //       //       label: `${city.name}, ${city.countryCode}`,
  //       //     };
  //       //   })
  //       // );

  //       // onSearchChange(
  //       //   response.data.map((city) => {
  //       //     return {
  //       //       value: `${city.latitude} ${city.longitude}`,
  //       //       label: `${city.name}, ${city.countryCode}`,
  //       //     };
  //       //   })
  //       // );
  //       // onSearchChange(response);
  //       onSearchChange(
  //         response.data.map((city) => {
  //           return {
  //             value: `${city.latitude} ${city.longitude}`,
  //             label: `${city.name}, ${city.countryCode}`,
  //           };
  //         })
  //       );
  //     })
  //     .catch((err) => console.error(err));
  // });
  // let yesMom = useCallback(() => props.update("yes mom"));

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  return (
    <AsyncPaginate
      placeholder="Search for City"
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
    />
  );
};

export default Search;

// import { useState } from "react";
// import { AsyncPaginate } from "react-select-async-paginate";

// const Search = ({ onSearchChange }) => {
//   const [search, setSearch] = useState(null);

//   const handleOnChange = (searchData) => {
//     setSearch(searchData);
//     onSearchChange(searchData);
//   };

//   return (
//     <AsyncPaginate
//       placeholder="Search for City"
//       debounceTimeout={600}
//       value={search}
//       onChange={handleOnChange}
//     />
//   );
// };
// export default Search;
