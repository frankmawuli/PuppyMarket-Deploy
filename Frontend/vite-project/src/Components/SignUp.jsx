import { useState } from 'react';
import dogImg from '../Images/dogimg.jpg';
import { useToast, Spinner } from '@chakra-ui/react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function SignUp() {
  const navigate = useNavigate()
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const registerUser = async (e) => {
    e.preventDefault();

    if (user.password !== user.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post('http://localhost:3000/api/auth/register', {
        name: `${user.firstName} ${user.lastName}`,
        password: user.password,
        telephone: user.phone,
        email: user.email,
        profile: 'https://media.istockphoto.com/id/2026155202/photo/a-tricolor-mixed-breed-dog-listening-intently-with-a-foggy-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=IzrfK-7Xm9LVFGNPpnj6uwQR2b5xYjEnfVMGrwJrAO4=',
      });

      if (res.status === 201) {
        toast({
          title: "Success",
          description: "Account created successfully!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        navigate('/login')
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "An error occurred .",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <section className="bg-gray-50 min-h-screen">
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
          <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
            <img
              alt="Dog"
              src={dogImg}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </aside>

          <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
            <div className="w-full max-w-lg space-y-8 bg-white shadow-lg rounded-lg p-8">
              <h2 className="text-3xl font-bold text-gray-800">Sign Up for Puppy Marketplace</h2>

              <form className="mt-6 space-y-6" onSubmit={registerUser}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      value={user.firstName}
                      onChange={handleChange}
                      className="w-full px-2 py-1 mt-1 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-600">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      value={user.lastName}
                      onChange={handleChange}
                      className="w-full px-2 py-1 mt-1 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-600">Email</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={user.email}
                      onChange={handleChange}
                      className="w-full px-2 py-1 mt-1 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-600">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={user.phone}
                      onChange={handleChange}
                      className="w-full px-2 py-1 mt-1 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        required
                        value={user.password}
                        onChange={handleChange}
                        className="w-full px-2 py-1 mt-1 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-3 flex items-center text-xs text-gray-500"
                      >
                        {showPassword ? "Hide" : "Show"}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-600">Confirm Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="confirmPassword"
                        required
                        value={user.confirmPassword}
                        onChange={handleChange}
                        className="w-full px-2 py-1 mt-1 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-3 flex items-center text-xs text-gray-500"
                      >
                        {showPassword ? "Hide" : "Show"}
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className={`w-full py-2 mt-4 text-white text-sm font-bold bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 ${loading ? 'cursor-not-allowed opacity-50' : ''
                    }`}
                  disabled={loading}
                >
                  {loading ? <Spinner size="sm" /> : "Sign Up"}
                </button>

                <Link to="/login" className="block mt-4 text-center text-blue-600 text-sm hover:underline">
                  Already have an account? Login
                </Link>
              </form>
            </div>
          </main>
        </div>
      </section>
    </div>
  );
}
