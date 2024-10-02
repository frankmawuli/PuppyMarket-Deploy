import { useEffect } from 'react';
import Card from './Card';
import { useListingStore } from '../Store/ListingStore';
import { useToast } from '@chakra-ui/react';
import Error from './Error';

export default function ViewListings() {
  const { puppies, getAllListings } = useListingStore();
  const toast = useToast();

  useEffect(() => {
    const fetchListings = async () => {
      const { success, message } = await getAllListings();
      console.log(message); // Log message from API response

      if (success) {
        toast({
          title: "Listings fetched successfully",
          status: "success", // Use "success" instead of "success: true"
          duration: 3000,
          isClosable: true,
        });
      }else{
        toast({
          title: "Failed to fetch listings",
          status: "error", // Use "error" instead of "success: false"
          duration: 3000,
          isClosable: true,
        });
      }

    };

    fetchListings();
  }, [getAllListings, toast]); // Added toast to the dependency array

  console.log(puppies);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">View Listings</h1>
      {puppies.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {puppies.map((puppy) => (
            <Card key={puppy._id} puppy={puppy} />
          ))}
        </div>
      ) : (
        <Error/>
      )}
    </div>
  );
}
