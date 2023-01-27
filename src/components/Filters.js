import React, { useEffect } from "react";
import Select from "react-select";

function Filters({ products, filteredProducts, setFilteredProducts }) {
  const handleSearchFilter = (e) => {
    const searchWord = e.target.value;
    if (searchWord === "") {
      setFilteredProducts(products);
    }
    const searchedProducts = products.filter((product) => {
      return product.title.toLowerCase().includes(searchWord.toLowerCase());
    });
    setFilteredProducts(searchedProducts);
  };

  // collection filter
  const singleInputStyle = {
    control: (baseStyles, state) => ({
      ...baseStyles,
      color: "black",
      background: "white",
    }),
    option: (provided) => ({
      ...provided,
      color: "black",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "black",
    }),
  };

  // get all the authors of the issues in the project
  let collectionNames = products.map((product) => product.collectionName);
  // to remove duplicate authors
  collectionNames = [...new Set(collectionNames)];

  const productCollectionOptions = collectionNames.map((collectionName) => {
    let optionObject = {
      value: collectionName,
      label: collectionName,
    };
    return optionObject;
  });

  let blockchains = products.map((product) => product.chain);
  // to remove duplicate authors
  blockchains = [...new Set(blockchains)];

  const blockchainOptions = blockchains.map((blockchain) => {
    let optionObject = {
      value: blockchain,
      label: blockchain,
    };
    return optionObject;
  });

  const handleProductCollectionChange = (selectedOption) => {
    let collectionFilteredProducts = products.filter(function checkCollection(
      product
    ) {
      return product.collectionName === selectedOption.value;
    });
    setFilteredProducts(collectionFilteredProducts);
  };

  const handleBlockchainChange = (selectedOption) => {
    let blockchainFilteredProducts = products.filter(function checkCollection(
      product
    ) {
      return product.chain === selectedOption.value;
    });
    setFilteredProducts(blockchainFilteredProducts);
  };

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  return (
    <div className="filters_container">
      <h3>Filters:</h3>
      <div className="search_filter">
        <p>Search by Product Title:</p>
        <input
          type="text"
          onChange={handleSearchFilter}
          placeholder="Enter Product Title"
        />
      </div>
      <div className="collection_filter">
        <p>Search by Collections:</p>
        <Select
          options={productCollectionOptions}
          closeMenuOnSelect={true}
          hideSelectedOptions={true}
          name="Collection"
          className="basic-single"
          classNamePrefix="select"
          onChange={handleProductCollectionChange}
          isRtl={false}
          isSearchable={true}
          styles={singleInputStyle}
          isClearable={true}
        />
      </div>

      <div className="blockchain_filter">
        <p>Search by Blockchain:</p>
        <Select
          options={blockchainOptions}
          closeMenuOnSelect={true}
          hideSelectedOptions={true}
          name="Collection"
          isClearable={true}
          className="basic-single"
          classNamePrefix="select"
          onChange={handleBlockchainChange}
          isRtl={false}
          isSearchable={true}
          styles={singleInputStyle}
        />
      </div>
    </div>
  );
}

export default Filters;
