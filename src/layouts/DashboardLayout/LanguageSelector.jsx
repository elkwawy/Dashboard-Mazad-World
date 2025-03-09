import { Select, Space } from "antd";
import { useState } from "react";

const LanguageSelector = ({ setDropdownOpen }) => {
  const [language, setLanguage] = useState("en");

  const handleLanguageChange = (value) => {
    console.log("Selected Language:", value);
    setDropdownOpen(false);
    setLanguage(value);
  };

  const languages = [
    {
      value: "en",
      label: "English",
    },
    {
      value: "ar",
      label: "Arabic",
    },
    {
      value: "gn",
      label: "German",
    },
  ];
  return (
    <Space
      className="w-full justify-between"
      onClick={(e) => e.stopPropagation()}
    >
      <span>Language</span>
      <Select
        className="w-[94px]"
        value={language}
        // showSearch
        optionFilterProp="label"
        onChange={handleLanguageChange}
        options={languages}
      />
    </Space>
  );
};

export default LanguageSelector;
