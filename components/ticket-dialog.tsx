import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
interface TicketDialogProps {
    openModal: boolean;
    closeModal: () => void;
  }

const TicketDialog: React.FC<TicketDialogProps> = ({openModal, closeModal}) => {
  return (
    <Dialog  open={openModal} onOpenChange={() => closeModal()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Kupon kodunuzu ekleyin</DialogTitle>
          <DialogDescription>
            Kupon kodu online kredi kartı veya cüzdan ödeme yöntemlerinde geçerlidir.
          </DialogDescription>
        </DialogHeader>
        <div className=" py-4">
          <div className="items-center">
            <Input id="ticket" value="TTN2024TTTTTTT1" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Uygula</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TicketDialog;
