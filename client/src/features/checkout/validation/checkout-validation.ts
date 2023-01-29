import * as yup from "yup";

export const validationSchema = [
    yup.object({
        fullName: yup.string().required("Full name is required"),
        addressOne: yup.string().required("Address One is required"),
        addressTwo: yup.string().required("Address Two is required"),
        city: yup.string().required("City is required"),
        state: yup.string().required("State is required"),
        zip: yup.string().required("Zip is required"),
        country: yup.string().required("Country is required"),
    }),
    yup.object(),
    yup.object({
        nameOnCard: yup.string().required()
    })
];
