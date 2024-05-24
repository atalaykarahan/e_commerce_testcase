import { ChevronLeft, ChevronRight, CircleMinus, CirclePlus, PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { Pagination, PaginationContent, PaginationItem } from "./ui/pagination";

export default function BasketItems() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead />
          <TableHead />
          <TableHead />
          <TableHead />
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-semibold">Harika Kahve</TableCell>
          <TableCell>
            <Label>2</Label>
          </TableCell>
          <TableCell>
            <Label>24.99₺</Label>
          </TableCell>
          <TableCell>
            <Pagination className="ml-auto mr-0 w-auto">
              <PaginationContent>
                <PaginationItem>
                  <Button size="icon" variant="outline" className="h-6 w-6">
                    <CircleMinus className="h-3.5 w-3.5"/>
                    <span className="sr-only">Çıkart</span>
                  </Button>
                </PaginationItem>
                <PaginationItem>
                  <Button size="icon" variant="outline" className="h-6 w-6">
                    <CirclePlus className="h-3.5 w-3.5"/>
                    <span className="sr-only">Ekle</span>
                  </Button>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-semibold">Harika Kahve</TableCell>
          <TableCell>
            <Label>2</Label>
          </TableCell>
          <TableCell>
            <Label>24.99₺</Label>
          </TableCell>
          <TableCell>
            <Pagination className="ml-auto mr-0 w-auto">
              <PaginationContent>
                <PaginationItem>
                  <Button size="icon" variant="outline" className="h-6 w-6">
                    <CircleMinus className="h-3.5 w-3.5"/>
                    <span className="sr-only">Çıkart</span>
                  </Button>
                </PaginationItem>
                <PaginationItem>
                  <Button size="icon" variant="outline" className="h-6 w-6">
                    <CirclePlus className="h-3.5 w-3.5"/>
                    <span className="sr-only">Ekle</span>
                  </Button>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-semibold">Harika Kahve</TableCell>
          <TableCell>
            <Label>2</Label>
          </TableCell>
          <TableCell>
            <Label>24.99₺</Label>
          </TableCell>
          <TableCell>
            <Pagination className="ml-auto mr-0 w-auto">
              <PaginationContent>
                <PaginationItem>
                  <Button size="icon" variant="outline" className="h-6 w-6">
                    <CircleMinus className="h-3.5 w-3.5"/>
                    <span className="sr-only">Çıkart</span>
                  </Button>
                </PaginationItem>
                <PaginationItem>
                  <Button size="icon" variant="outline" className="h-6 w-6">
                    <CirclePlus className="h-3.5 w-3.5"/>
                    <span className="sr-only">Ekle</span>
                  </Button>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </TableCell>
        </TableRow>
      
      </TableBody>
    </Table>
  );
}
