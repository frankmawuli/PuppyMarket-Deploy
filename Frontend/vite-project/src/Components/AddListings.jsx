import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  Textarea,
  useToast
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const PuppyForm = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const toast = useToast();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('breed', data.breed);
    formData.append('age', data.age);
    formData.append('price', data.price);
    formData.append('description', data.description);
    for (let i = 0; i < data.images.length; i++) {
      formData.append('images', data.images[i]);
    }

    try {
      await axios.post('/api/listing', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      toast({
        title: 'Puppy added successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      reset(); // Clear the form
    } catch (error) {
      toast({
        title: 'Failed to add puppy.',
        description: error.response?.data?.message || 'An error occurred.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={8}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.name} mb={4}>
          <FormLabel htmlFor="name">Puppy Name</FormLabel>
          <Input
            id="name"
            placeholder="Enter puppy name"
            {...register('name', { required: 'Puppy name is required' })}
          />
        </FormControl>

        <FormControl isInvalid={errors.breed} mb={4}>
          <FormLabel htmlFor="breed">Breed</FormLabel>
          <Input
            id="breed"
            placeholder="Enter puppy breed"
            {...register('breed', { required: 'Breed is required' })}
          />
        </FormControl>

        <FormControl isInvalid={errors.age} mb={4}>
          <FormLabel htmlFor="age">Age</FormLabel>
          <NumberInput>
            <NumberInputField
              id="age"
              placeholder="Enter puppy age"
              {...register('age', { required: 'Age is required' })}
            />
          </NumberInput>
        </FormControl>

        <FormControl isInvalid={errors.price} mb={4}>
          <FormLabel htmlFor="price">Price</FormLabel>
          <NumberInput>
            <NumberInputField
              id="price"
              placeholder="Enter price"
              {...register('price', { required: 'Price is required' })}
            />
          </NumberInput>
        </FormControl>

        <FormControl isInvalid={errors.description} mb={4}>
          <FormLabel htmlFor="description">Description</FormLabel>
          <Textarea
            id="description"
            placeholder="Enter a description"
            {...register('description', { required: 'Description is required' })}
          />
        </FormControl>

        <FormControl mb={4}>
          <FormLabel htmlFor="images">Upload Images</FormLabel>
          <Input
            type="file"
            id="images"
            multiple
            accept="image/*"
            {...register('images', { required: 'At least one image is required' })}
          />
        </FormControl>

        <Button colorScheme="blue" type="submit" width="full">
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default PuppyForm;
