import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const signupSchema = z
  .object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    userType: z.enum(["user", "speaker"]),
    pricePerSession: z.number().optional(),
    bio: z.string().optional(),
  })
  .refine(
    (data) => {
      if (
        data.userType === "speaker" &&
        (data.pricePerSession === undefined || data.pricePerSession <= 0)
      ) {
        return false;
      }
      return true;
    },
    {
      message:
        "Price per session is required for speakers and must be greater than 0.",
      path: ["pricePerSession"],
    }
  );

type SignupFormData = z.infer<typeof signupSchema>;

interface SignupFormProps {
  initialUserType: "user" | "speaker"; // User type to be passed as a prop
}

export function SignupForm({ initialUserType }: SignupFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      userType: initialUserType,
    },
  });

  const [userType, setUserType] = useState<"user" | "speaker">(initialUserType);

  useEffect(() => {
    setValue("userType", initialUserType);
    setUserType(initialUserType);
  }, [initialUserType, setValue]);

  const onSubmit = async (data: SignupFormData) => {
    console.log("Form data submitted:", data);
    try {
      const response = await fetch("http://localhost:5000/api/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Signup successful!");
      } else {
        const responseData = await response.json();
        alert(responseData.error || "Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("Error: " + error.message);
    }
  };

  const userTypeValue = watch("userType");
  useEffect(() => {
    if (userTypeValue !== userType) {
      setUserType(userTypeValue);
    }
  }, [userTypeValue]);

  return (
    <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            {...register("firstName")}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="First Name"
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm">{errors.firstName.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            {...register("lastName")}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Last Name"
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm">{errors.lastName.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            {...register("email")}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            {...register("password")}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            User Type
          </label>
          <input
            value={userType}
            readOnly
            className="w-full px-3 py-2 border rounded-md bg-gray-100"
          />
        </div>

        {userType === "speaker" && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Price Per Session
              </label>
              <input
                type="number"
                {...register("pricePerSession", {
                  valueAsNumber: true,
                })}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Price Per Session"
              />
              {errors.pricePerSession && (
                <p className="text-red-500 text-sm">
                  {errors.pricePerSession.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Bio
              </label>
              <textarea
                {...register("bio")}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Your Bio"
              />
              {errors.bio && (
                <p className="text-red-500 text-sm">{errors.bio.message}</p>
              )}
            </div>
          </>
        )}
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
