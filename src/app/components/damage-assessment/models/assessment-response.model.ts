import { FileMetadata } from "./file-metadata.model";

export interface DamageAssessmentResponse {
    id: string;               // Unique identifier for the assessment
    claimId: string;          // Claim ID related to the damage
    fileName: string;         // Name of the uploaded file
    description: string;      // Description of the damage
    uploadTimestamp: Date;    // Timestamp when the file was uploaded
    fileMetadata: FileMetadata; // Stores additional file details
  }
  