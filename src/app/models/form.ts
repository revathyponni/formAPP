import { FormRow } from "./field";

/**
 * Form model interface for form builder.
 */
export interface StoredForm {
  id: string;
  name: string;
  rows: FormRow[];
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Form submission interface for form builder.
 */
export interface FormSubmission {
  id: string;
  formId: string;
  data: Record<string, any>;
  submittedAt: Date;
}
