import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await fetch("https://server-site-sigma-ashy.vercel.app/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const errorData = await res.json();
        toast.error("Failed to send message");
        
      } else {
        toast.success("Message sent successfully!")
       
        reset();
      }
    } catch {
      toast.error("Network error!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-100 flex items-center justify-center p-6">
      <div className="grid lg:grid-cols-2 gap-12 w-full max-w-6xl">
        
        {/* Contact Info */}
        <div className="bg-white rounded-xl shadow-xl p-8">
          <h2 className="text-xl font-semibold mb-6 text-center text-neutral">Contact Info</h2>
          <ul className="space-y-6 text-lg text-neutral">
            <li>
              📧 <span className="font-semibold">Email:</span>{" "}
              <a href="mailto:yourmail@example.com" className="text-blue-600 hover:underline">
                lsabrinahossain@gmail.com
              </a>
            </li>
            <li>
              📞 <span className="font-semibold">Phone:</span>{" "}
              <a href="tel:+880123456789" className="text-blue-600 hover:underline">
                +8801990983050
              </a>
            </li>
            <li>
              🌐 <span className="font-semibold">Facebook:</span>{" "}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                facebook.com/readify
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-xl shadow-xl p-8">
          <h2 className="text-xl font-semibold mb-6 text-center text-neutral">Send a Message</h2>
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
            <div>
              <label className="block mb-1 font-medium">Name</label>
              <input
                type="text"
                placeholder="Your name"
                className={`input input-bordered w-full ${errors.name ? "input-error" : ""}`}
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && <p className="text-error text-sm mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input
                type="email"
                placeholder="Your email"
                className={`input input-bordered w-full ${errors.email ? "input-error" : ""}`}
                {...register("email", {
                  required: "Email is required",
                  pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" },
                })}
              />
              {errors.email && <p className="text-error text-sm mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block mb-1 font-medium">Message</label>
              <textarea
                placeholder="Your message"
                className={`textarea textarea-bordered w-full ${errors.message ? "textarea-error" : ""}`}
                {...register("message", { required: "Message is required" })}
                rows={5}
              />
              {errors.message && <p className="text-error text-sm mt-1">{errors.message.message}</p>}
            </div>

            <button
              type="submit"
              className={`btn btn-primary w-full ${isSubmitting ? "loading" : ""}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>

            {isSubmitSuccessful && (
              <p className="text-green-600 mt-4 text-center font-medium">
                Thank you for contacting us!
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}