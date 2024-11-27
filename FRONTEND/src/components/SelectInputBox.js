const SelectInputBox = ({
  title,
  value,
  data,
  name,
  textHandler,
}) => {
  return (
    <div >
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
        {title}
      </label>
      <select
        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-blue-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
        onChange={textHandler}
        value={value}
        name={name}
      >
        {data.map((value, key) => (
          <option key={key} value={value}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInputBox;
