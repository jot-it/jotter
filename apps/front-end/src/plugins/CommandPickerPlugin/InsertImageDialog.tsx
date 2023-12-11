import Button from "@/components/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/Dialog";
import { ImageOutlineIcon } from "@/components/Icons";
import { Input } from "@/components/Input";
import { Label } from "@/components/Label";
import { ChangeEventHandler, FormEventHandler, useId, useState } from "react";
import { CommandPickerItem } from "./CommandPicker";

type InsertImageCommandProps = {
  onInsert(src: string, alt?: string): void;
};

type FormValues = {
  src: string;
  alt?: string;
};

function InsertImageCommand({ onInsert }: InsertImageCommandProps) {
  const [show, setShow] = useState(false);
  const [formValues, setFormValues] = useState<FormValues>({
    src: "",
    alt: "",
  });
  const urlId = useId();
  const descriptionId = useId();
  const formId = useId();

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    if (form.checkValidity()) {
      onInsert(form.src.value, form.alt.value);
    }
  };

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) => {
    const fieldName = target.name as keyof FormValues;
    setFormValues({
      ...formValues,
      [fieldName]: target.value,
    });
  };

  return (
    <Dialog open={show} onOpenChange={setShow}>
      <DialogTrigger className="w-full" asChild>
        <CommandPickerItem
          icon={<ImageOutlineIcon />}
          onSelect={() => setShow(true)}
          label="Image"
          keywords="image picture figure"
        />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Insert image</DialogTitle>
          <DialogDescription>
            Add a new image to this document. Paste the URL and click insert.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} id={formId}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor={urlId} className="text-right">
                URL
              </Label>
              <Input
                className="col-span-3"
                value={formValues.src}
                id={urlId}
                name="src"
                type="url"
                required
                placeholder="Paste the URL of the image..."
                autoComplete="off"
                onChange={handleInputChange}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor={descriptionId} className="text-right">
                Description
              </Label>
              <Input
                className="col-span-3"
                value={formValues?.alt}
                id={descriptionId}
                name="alt"
                type="text"
                placeholder="A cloudy blue sky with green mountains...."
                autoComplete="off"
                onChange={handleInputChange}
              />
            </div>
          </div>
        </form>
        <DialogFooter>
          <Button type="submit" form={formId}>
            Insert
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { InsertImageCommand };
