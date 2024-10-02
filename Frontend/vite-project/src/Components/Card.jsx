/* eslint-disable react/prop-types */
import { Button, } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";
export default function Card({ puppy }) {
  return (
    <a href="#" className="block rounded-lg p-4 shadow-sm shadow-indigo-100 transition-transform transform hover:scale-105">
      {puppy.images ?
        <img
          alt={puppy.breed}
          src={`http://localhost:3000/${puppy.images[0].path}`}

          
          className="h-56 w-full rounded-md object-cover"
        />
        : <Spinner />
      }

      <div className="mt-2">
        <dl>
          <div>
            <dt className="sr-only">Name</dt>
            <dd className="text-sm text-gray-500">{puppy.breed} Male</dd>
          </div>

          <div>
            <dt className="sr-only">Location</dt>
            <dd className="font-medium">{puppy.location}</dd>
          </div>
        </dl>

        <div className="mt-6 flex flex-wrap gap-4 text-xs">
          <div className="inline-flex items-center gap-2">
            {/* Age and gender */}
            <p className="text-gray-500">{puppy.age} years</p>
          </div>

          <div className="inline-flex items-center gap-2">
            {/* Breed */}
            <p className="text-gray-500">{puppy.breed}</p>
            <p className="font-medium">Breeding</p>
          </div>

          <div className="inline-flex items-center gap-2">
            {/* Message Button */}
            <Button colorScheme="blue" size="sm">Message</Button>
          </div>
        </div>
      </div>

    </a>
  );
}