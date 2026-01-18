import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Eye } from "lucide-react";

export function createColumns({ columns, onEdit, onDelete, onView }) {
  return [
    ...columns,
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const data = row.original;

        return (
          <div className="flex justify-end gap-2">
            <Button size="sm" variant="outline" onClick={() => onView?.(data)}>
              <Eye className="h-4 w-4" />
            </Button>
            {onEdit && (
              <Button size="sm" variant="outline" onClick={() => onEdit?.(data)}>
                <Pencil className="h-4 w-4" />
              </Button>
            )}

            {onDelete && (
            <Button
              size="sm"
              variant="destructive"
              onClick={() => onDelete?.(data)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
            )}
          </div>
        );
      },
    },
  ];
}
