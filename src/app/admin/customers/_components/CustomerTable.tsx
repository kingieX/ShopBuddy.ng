import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  location: string;
  emailVerified: boolean;
  createdAt: string;
}

interface CustomerTableProps {
  customers: Customer[];
}

const CustomerTable: React.FC<CustomerTableProps> = ({ customers }) => {
  return (
    <div className="w-full overflow-auto">
      <ScrollArea>
        <div className="w-full max-w-xs overflow-x-auto lg:max-w-max">
          <Table className="w-full min-w-[990px] px-2">
            <TableHeader>
              <TableRow>
                <TableHead className="font-semibold">Customer</TableHead>
                <TableHead className="font-semibold">Phone</TableHead>
                <TableHead className="font-semibold">Email</TableHead>
                <TableHead className="font-semibold">Location</TableHead>
                <TableHead className="font-semibold">Date Created</TableHead>
                <TableHead className="font-semibold sm:table-cell">
                  Status
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="flex items-center space-x-1">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-button">
                      {/* <Image
                        src={'/images/avatars/avatar-1.jpg'} // Placeholder image
                        alt={customer.firstName}
                        width={28}
                        height={28}
                        className="h-8 w-8 rounded-full"
                      /> */}
                      <p className="font-semibold text-white">
                        {customer.firstName.charAt(0)}
                      </p>
                    </div>
                    <div>
                      {customer.firstName} {customer.lastName}
                    </div>
                  </TableCell>
                  <TableCell>{customer.phoneNumber}</TableCell>
                  <TableCell className="md:table-cell">
                    {customer.email}
                  </TableCell>
                  <TableCell className="sm:table-cell">
                    {customer.location}
                  </TableCell>
                  <TableCell>
                    {new Date(customer.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="sm:table-cell">
                    {customer.emailVerified === true ? (
                      <Badge className="rounded-full bg-green-100 text-xs text-green-700">
                        Active
                      </Badge>
                    ) : (
                      <Badge className="rounded-full bg-gray-100 text-xs text-red-700">
                        Inactive
                      </Badge>
                    )}
                    {/* <Badge
                className={`rounded-full text-xs ${customer.emailVerified === 'Active' ? 'bg-blue-100 text-green-700' : 'bg-gray-100 text-red-700'}`}
              >
                {customer.emailVerified}
              </Badge> */}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </ScrollArea>
    </div>
  );
};

export default CustomerTable;
