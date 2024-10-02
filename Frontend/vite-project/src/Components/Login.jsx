import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Heading,
    useBreakpointValue,
    useColorModeValue,
    useToast,
    Spinner,
} from '@chakra-ui/react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const navigate = useNavigate()
    const toast = useToast();
    const [loading, setLoading] = useState(false); // Loading state
    const [user, setUser] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({ ...prevUser, [name]: value }));
    };

    const loginUser = async (e) => {
        e.preventDefault();

        setLoading(true); // Set loading to true

        try {
            const res = await axios.post('http://localhost:3000/api/auth/login', {
                email: user.email,
                password: user.password,
            });

            if (res.status === 201) {
                toast({
                    title: "Success",
                    description: "Logged in successfully!",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
                navigate('/dashboard')
                // Optionally redirect or clear the form
            }
        } catch (error) {
            toast({
                title: "Error",
                description: error.response.data.message || "An error occurred",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }

        setLoading(false); // Set loading to false
    };

    return (
        <Box
            minH="100vh"
            display="flex"
            justifyContent="center"
            alignItems="center"
            bg={useColorModeValue('gray.50', 'gray.800')}
            px={{ base: 4, md: 8 }}
        >
            <Box
                width={{ base: '100%', md: '400px' }}
                p={8}
                boxShadow="lg"
                bg={useColorModeValue('white', 'gray.700')}
                borderRadius="lg"
            >
                <Stack spacing={6}>
                    <Heading fontSize={useBreakpointValue({ base: 'xl', md: '2xl' })} textAlign="center">
                        Log in to your account
                    </Heading>

                    <FormControl id="email">
                        <FormLabel>Email address</FormLabel>
                        <Input
                            type="email"
                            placeholder="Enter your email"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                        />
                    </FormControl>

                    <FormControl id="password">
                        <FormLabel>Password</FormLabel>
                        <Input
                            type="password"
                            placeholder="Enter your password"
                            name="password"
                            value={user.password}
                            onChange={handleChange}
                        />
                    </FormControl>

                    <Button
                        colorScheme="teal"
                        size="lg"
                        width="100%"
                        onClick={loginUser} // Trigger login function when clicked
                        disabled={loading} // Disable the button when loading
                    >
                        {loading ? <Spinner /> : 'Log in'}
                    </Button>
                </Stack>
            </Box>
        </Box>
    );
};

export default LoginForm;
