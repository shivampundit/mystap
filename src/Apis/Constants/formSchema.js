import * as yup from "yup";

const nameRegex = /^[a-zA-Z_ ]*$/;

/////////////////////// Login Schema ///////////////////////////////
export const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid Email").required("Required"),
  password: yup.string().min(7).required("Required"),
});

/////////////////////// Reset Password Schema ///////////////////////////////
export const resetPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .min(7, "Must be at least 7 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .min(7, "Must be at least 7 characters")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

/////////////////// Add Edit Lead Schema ////////////////////////////
export const addEditLeadSchema = yup.object().shape({
  name: yup
    .string()
    .required("Client Name is Required")
    .matches(nameRegex, "Only alphabets are allowed"),
  email: yup.string().email("Invalid Email").required("Email is Required"),
  phoneNumber: yup
    .number()
    .typeError("Must be a number")
    .required("Required")
    .test(
      "phoneNumber",
      "Must be exactly 10 numbers",
      (val) => `${val}`.length === 10
    ),
  buildingName: yup.string().required("Building Name is Required"),
  address: yup.string().required("Street Address is Required"),
  city: yup.string().required("City is Required"),
  state: yup.string().required("State is Required"),
  pinCode: yup
    .number()
    .typeError("Must be a number")
    .required("Pincode is Required")
    .test(
      "pinCode",
      "Must be exactly 6 numbers",
      (val) => `${val}`.length === 6
    ),
});

///////////////////// Profile Build Schema ////////////////////////
export const profileBuildSchema = yup.object().shape({
  firstName: yup
    .string()
    .required("Required")
    .matches(nameRegex, "Only alphabets are allowed"),
  lastName: yup
    .string()
    .required("Required")
    .matches(nameRegex, "Only alphabets are allowed"),
  phoneNumber: yup
    .number()
    .typeError("Must be a number")
    .required("Required")
    .test(
      "phoneNumber",
      "Must be exactly 10 numbers",
      (val) => `${val}`.length === 10
    ),
  isWhatsapp: yup.boolean(),
  whatsappNumber: yup.mixed().when("isWhatsapp", {
    is: false,
    then: yup
      .number()
      .typeError("Must be a number")
      .required("Required")
      .test(
        "phoneNumber",
        "Must be exactly 10 numbers",
        (val) => `${val}`.length === 10
      ),
  }),
  companyName: yup.string().required("Required"),
  workExperience: yup.string().required("Required"),
  city: yup.string().required("Required"),
  pinCode: yup
    .number()
    .typeError("Must be a number")
    .required("Required")
    .test(
      "pinCode",
      "Must be exactly 6 numbers",
      (val) => `${val}`.length === 6
    ),
});

///////////////////// Update Profile Schema ////////////////////////
export const updateProfileSchema = yup.object().shape({
  firstName: yup.string().required("Required"),
  lastName: yup.string().required("Required"),
  companyName: yup.string().required("Required"),
  // address: yup.string().required("Required"),
  email: yup.string().email("Invalid Email").required("Required"),
  phoneNumber: yup.number().typeError("Must be a number").required("Required"),
  city: yup.string().required("Required"),
  pinCode: yup.number().typeError("Must be a number").required("Required"),
});

///////////////////// discountDocumentSchema ////////////////////////
export const discountDocumentSchema = yup.object().shape({
  discountForDesigner: yup.number().required("Required"),
  masterRateFile: yup.mixed().required("Required"),
});

/////////////////////// Newsletter Schema ///////////////////////////////
export const newsLetterSchema = yup.object().shape({
  email: yup.string().email("Invalid Email").required("Required"),
});

/////////////////////// Contact Schema ///////////////////////////////
export const contactSchema = yup.object().shape({
  name: yup.string().required("Required"),
  email: yup.string().email("Invalid Email").required("Required"),
  phoneNumber: yup
    .number()
    .typeError("Must be a number")
    .required("Required")
    .test(
      "phoneNumber",
      "Must be exactly 10 numbers",
      (val) => `${val}`.length === 10
    ),
  subject: yup.string().required("Required"),
  data: yup.string().required("Required"),
});

/////////////////////// Contact Schema ///////////////////////////////
export const callbackSchema = yup.object().shape({
  name: yup.string().required("Required"),
  email: yup.string().email("Invalid Email").required("Required"),
  message: yup.string().required("Required"),
});

/////////////////////// Add New Project Schema ///////////////////////////////
export const newProjectSchema = yup.object().shape({
  projectName: yup.string().required("Required"),
  buildingName: yup.string().required("Required"),
  city: yup.string().required("Required"),
});
