import { Input } from './Filter.styled';

export const Filter = ({ filter, results, onChange }) => {
  const handleChange = e => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  let filterInfo = '';
  if (!results && !filter) filterInfo = <p>Your contact list is empty</p>;
  if (!results && filter) filterInfo = <p>Not Finded</p>;

  return (
    <>
      <label htmlFor="filter">Find contacts by name</label>
      <Input
        type="text"
        id="filter"
        name="filter"
        value={filter}
        onChange={handleChange}
        required
      />
      {filterInfo}
    </>
  );
};
