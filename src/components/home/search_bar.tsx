import React from "react";
import Button from 'react-bootstrap/Button';
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { bookForSearchInterface } from "../../utils/interfaces";
import { searchComicBooks } from "../../utils/service_managr";

const SearchBar = () => {
  const {
      register,
      control,
      handleSubmit,
    } = useForm<bookForSearchInterface>({
      defaultValues: {
        searchCriteria: "",
      }
    });

  const onSubmit: SubmitHandler<bookForSearchInterface> = (data) => {
    searchComicBooks(data.searchCriteria)
    };

  return (
    <form className="search-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="input-wrapper">
        <Controller
          name="searchCriteria"
          control={control}
          rules={{
            required: {value: true, message: "Book name is required"},
            minLength: {value: 3, message: "Book name is too short"},
            maxLength: {value: 30, message: "Book name  is too long"}
          }}
          render={({ field }) => <input {...field} type="text" className="input-field" placeholder="book namez" />}
        />
        <i className="material-symbols-out">search</i>
      </div>
      <Button>Search</Button>
    </form>
  );
}

export default SearchBar;