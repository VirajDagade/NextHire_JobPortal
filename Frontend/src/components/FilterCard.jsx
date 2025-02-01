import React, { useEffect } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Filter } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";

const filterData = [
  {
    filterType: "Location",
    array: ["Pune", "Mumbai", "Banglore", "Hydrebad", "Delhi"],
  },
  {
    filterType: "Job Role",
    array: [
      "System Engineer",
      "Backend Developer",
      "Data Analyst",
      "Software Tester",
    ],
  },
  {
    filterType: "Salary",
    array: ["2-4LPA", "5-8LPA", "9-12LPA", "Above 12LPA"],
  },
];

function FilterCard() {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
    // console.log(selectedValue);
  }, [selectedValue]);

  const changeHandler = (value) => {
    setSelectedValue(value);
  };

  return (
    <div className="w-full bg-white p-3 rounded-md">
      <div className="flex items-center justify-between">
        <h1 className="text-purple-950 font-semibold text-lg">Filter Jobs</h1>
        <Filter className="h-5 w-5" />
      </div>

      <hr className="mt-4" />
      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {/* For every data object in the filterData array:
        Creates a <div> for that category.
        Displays the filterType as a heading (<h1>).
         */}
        {filterData.map((data, index) => (
          <div className="mt-5">
            <h1 className="text-purple-950 font-semibold">{data.filterType}</h1>
            {/* Iterates over the array property of the current data object.
            For each item in the array:
            Renders a radio button (<RadioGroupItem>) with its value set to the item.
            Creates a label (<Label>) displaying the item text. */}
            {data.array.map((item, idx) => {
              const itemId = `id${index}-${idx}`;
              return (
                <div className="flex items-center space-x-2 my-2">
                  <RadioGroupItem value={item} id={itemId} />
                  {/* To ensure each radio button and label is unique, we create a unique itemId by combining index (for the category) and idx (for the value) as id${index}-${idx}.
6. Putting It Together: */}
                  <Label htmlfor={itemId}>{item}</Label>
                </div>
              );
            })}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}

export default FilterCard;
