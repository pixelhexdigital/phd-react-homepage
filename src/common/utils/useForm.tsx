import { useState, useEffect } from "react";
import { notification } from "antd";
import axios from "axios";

export const useForm = (validate: any) => {
  const [values, setValues] = useState<any>({});
  const [errors, setErrors] = useState({});
  const [shouldSubmit, setShouldSubmit] = useState(false);

  const openNotificationWithIcon = () => {
    notification["success"]({
      message: "Success",
      description: "Your message has been sent!",
    });
  };

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors(validate(values));
    if (!shouldSubmit) {
      const subject = "Contact Pixel Hex Digital";
      console.log(values);
      const body = `${values.message}\n${values.name}: ${values.email}`;

      const mailToLink = `mailto:contact@pixelhexdigital.com?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;

      window.location.href = mailToLink;
      setShouldSubmit(true);
    }
    // Your url for API
    // const url = "";
    // if (Object.keys(values).length === 3) {
    //   axios
    //     .post(url, {
    //       ...values,
    //     })
    //     .then(() => {
    //       setShouldSubmit(true);
    //     });
    // }
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && shouldSubmit) {
      setValues("");
      openNotificationWithIcon();
    }
  }, [errors, shouldSubmit]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    setValues((values: any) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
    setErrors((errors) => ({ ...errors, [event.target.name]: "" }));
  };

  return {
    handleChange,
    handleSubmit,
    values,
    errors,
  };
};
