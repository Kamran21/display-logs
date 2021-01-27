import React from "react";
import jsonFormat from "../../utils/jsonFormat";

//////////////////////////////////

const tree = {
  children: [
    {
      name: "timeseries",
      key: "timeseries",
      context: "types",
      type: "WorkflowType",
      label: "timeseries",
      groupingType: "types",
      value: "123",
      children: [
        {
          groupingType: "types.classes",
          label: "Listing Stock",
          id: "4d43e351-c813-11ea-b6c1-a5fe94ba90e9",
          value: "timeseries.Listing Stock",
          children: [
            {
              groupingType: "types.classes.BPM",
              label: "BPM_validated",
              id: "4d43e350-c813-11ea-b6c1-a5fe94ba90e9",
              value: "timeseries.Listing Stock.BPM_validated",
              children: [],
            },
          ],
        },
      ],
      id: "4d43e352-c813-11ea-b6c1-a5fe94ba90e9",
    },
  ],
  id: "4d43e353-c813-11ea-b6c1-a5fe94ba90e9",
};

const getArrValues = (arr, resArr) => {
  if (arr.length === 0) return;

  resArr.push(arr[0].value); ///obj.children.map(child=>(child.children, [...arr, obj.children.value]);
  const newArr = arr[0].children;
  if (newArr) getArrValues(newArr, resArr);
};

const produceValuesArr = (tree) => {
  const resArr = [];
  getArrValues(tree.children, resArr);
  return resArr;
};
//////////////////////////////////

function RecursiveValues() {
  const jsonTree = jsonFormat(tree);
  const valuesArr = jsonFormat(produceValuesArr(tree));
  return (
    <>
      <h1>Test</h1>
      <h2>Data:</h2>
      <pre>
        <code>{jsonTree}</code>
      </pre>
      <h2>Extracted values arr:</h2>
      <pre>
        <code>{valuesArr}</code>
      </pre>
    </>
  );
}
export default RecursiveValues;
