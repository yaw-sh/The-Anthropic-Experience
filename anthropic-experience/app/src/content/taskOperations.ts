import { z } from "zod";

const taskOperationSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  status: z.enum(["unresolved", "pending", "completed-by-user"]),
  statusLabel: z.string().min(1),
  claimId: z.string().min(1),
  sceneId: z.string().min(1),
  receiptId: z.string().min(1),
});

export type TaskOperation = z.infer<typeof taskOperationSchema>;

export const taskOperations = z.array(taskOperationSchema).length(5).parse([
  { id: "operation-github", label: "GitHub connection and use", status: "unresolved", statusLabel: "UNRESOLVED", claimId: "claim-original-question-body-1", sceneId: "original-question", receiptId: "receipt-original-question" },
  { id: "operation-react-build", label: "Governed React build", status: "pending", statusLabel: "NOT COMPLETE / PENDING", claimId: "claim-build-this-website-body-2", sceneId: "build-this-website", receiptId: "receipt-build-this-website" },
  { id: "operation-branch-cleanup", label: "Branch cleanup", status: "completed-by-user", statusLabel: "COMPLETED BY USER", claimId: "claim-branch-cleanup-body-2", sceneId: "branch-cleanup", receiptId: "receipt-branch-cleanup" },
  { id: "operation-pro-blueprint", label: "Pro creative and technical blueprint", status: "unresolved", statusLabel: "NOT COMPLETE", claimId: "claim-chatgpt-pro-body-3", sceneId: "chatgpt-pro", receiptId: "receipt-chatgpt-pro" },
  { id: "operation-final-experience", label: "Final experience", status: "pending", statusLabel: "PENDING", claimId: "claim-release-pending", sceneId: "finale", receiptId: "receipt-finale" },
]);
