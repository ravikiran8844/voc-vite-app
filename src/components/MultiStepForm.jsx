import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const showroomLocations = [
  "Anna Nagar",
  "Puducherry",
  "Vellore",
  "Hosur",
  "Trichy",
  "Salem",
  "Erode",
  "Coimbatore",
  "Experience Center",
  "Pollachi",
  "Udumalpet",
  "Madurai",
  "Ramnad",
];

const stepSchemas = [
  z.object({}), // Step 1: No validation
  z.object({
    showroom: z.preprocess(
        value => (value === null ? "" : value), // Convert null to an empty string
        z.string().min(1, "Please select a showroom")
      ),
          date: z.string().min(1, "Please select a date"),
    salesExecNumber: z.string().min(1, "Enter Sales Executive E-Number"),
    salesExecName: z.string().min(1, "Enter Sales Executive Name"),
  }),
  z.object({
    customerNumber: z.string().min(1, "Enter Customer Number"),
  }),
  z.object({
    customerName: z.string().min(1, "Enter Customer Name"),
    customerAddress: z.string().min(1, "Enter Customer Address"),
  }),
];

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(stepSchemas[step - 1]),
    mode: "onChange",
  });

  const onSubmit = (data) => {
    const updatedData = { ...formData, ...data };
    setFormData(updatedData);

    if (step < 4) {
      setStep(step + 1);
    } else {
      console.log("Final Submission Data:", updatedData);
      setSubmitted(true); // Show Thank You screen
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F2EDE4] p-10">
        <h2 className="text-3xl font-semibold text-center">Thank You!</h2>
        <p className="text-center text-xl text-gray-700 mt-3">
          Your feedback has been submitted successfully.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen max-w-3xl mx-auto shadow-md">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {step === 1 && (
          <div>
            <div>
              <img src="/banner.webp" />
            </div>
            <div>
              <button
                type="button"
                onClick={() => setStep(2)}
                className="text-white uppercase font-semibold text-xl cursor-pointer text-center bg-[#964A26] p-8  w-full"
              >
                Enter your Feedback
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <div className="flex flex-col sm:flex-row">
              <div className="bg-[#F2EDE4] flex justify-center items-center sm:w-1/2">
                <img src="/logo.png" className="p-2 max-w-42" />
              </div>
              <div>
                <img src="/banner2.webp" />
              </div>
            </div>

            <div className="p-10">
            <h2 className="text-xl font-semibold mb-6">Select Your Showroom</h2>
            <div className="grid grid-cols-2 gap-3">
              {showroomLocations.map((location) => (
                <label key={location} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value={location}
                    {...register("showroom", { required: "Please select a showroom" })}
                    className="w-4 h-4"
                  />
                  <span>{location}</span>
                </label>
              ))}
            </div>
            {errors.showroom && (
              <p className="text-red-500">{errors.showroom.message}</p>
            )}

            <label className="block mt-6">
              <span className="font-medium">Date</span>
              <input
                type="date"
                {...register("date")}
                className="w-full border rounded-lg p-2"
              />
              {errors.date && <p className="text-red-500">{errors.date.message}</p>}
            </label>

            <label className="block mt-3">
              <span className="font-medium">Sales Executive E-Number</span>
              <input
                type="text"
                {...register("salesExecNumber")}
                className="w-full border rounded-lg p-2"
              />
              {errors.salesExecNumber && (
                <p className="text-red-500">{errors.salesExecNumber.message}</p>
              )}
            </label>

            <label className="block mt-3">
              <span className="font-medium">Sales Executive Name</span>
              <input
                type="text"
                {...register("salesExecName")}
                className="w-full border rounded-lg p-2"
              />
              {errors.salesExecName && (
                <p className="text-red-500">{errors.salesExecName.message}</p>
              )}
            </label>

            <div className="flex justify-end mt-6">
              <button type="submit" className="px-6 py-3 bg-black text-white rounded-lg">
                Continue
              </button>
            </div>
          </div>
          </div>
        )}

        {step === 3 && (
        <div>
            <div className="flex flex-col sm:flex-row">
              <div className="bg-[#F2EDE4] flex justify-center items-center sm:w-1/2">
                <img src="/logo.png" className="p-2 max-w-42" />
              </div>
              <div>
                <img src="/banner2.webp" />
              </div>
            </div>
            <div className="p-10">
            <h2 className="text-xl font-semibold">Enter Customer Number</h2>
            <input
              type="number"
              {...register("customerNumber")}
              className="w-full border rounded-lg p-2"
            />
            {errors.customerNumber && (
              <p className="text-red-500">{errors.customerNumber.message}</p>
            )}

            <div className="flex justify-end mt-6">
              <button type="submit" className="px-6 py-3 bg-black text-white rounded-lg">
                Continue
              </button>
            </div>
          </div>
        </div>
        )}

        {step === 4 && (
         <div>
            <div className="flex flex-col sm:flex-row">
              <div className="bg-[#F2EDE4] flex justify-center items-center sm:w-1/2">
                <img src="/logo.png" className="p-2 max-w-42" />
              </div>
              <div>
                <img src="/banner2.webp" />
              </div>
            </div>
             <div className="p-10">
            <h2 className="text-xl font-semibold mb-6">Customer Details</h2>

            <label className="block">
              <span className="font-medium">Name</span>
              <input
                type="text"
                {...register("customerName")}
                className="w-full border rounded-lg p-2"
              />
              {errors.customerName && (
                <p className="text-red-500">{errors.customerName.message}</p>
              )}
            </label>

            <label className="block mt-3">
              <span className="font-medium">Address</span>
              <textarea
                {...register("customerAddress")}
                className="w-full border rounded-lg p-2"
              ></textarea>
              {errors.customerAddress && (
                <p className="text-red-500">{errors.customerAddress.message}</p>
              )}
            </label>

            <div className="flex justify-end mt-6">
              <button type="submit" className="px-6 py-3 bg-green-600 text-white rounded-lg">
                Submit
              </button>
            </div>
          </div>
         </div>
        )}
      </form>
    </div>
  );
};

export default MultiStepForm;
