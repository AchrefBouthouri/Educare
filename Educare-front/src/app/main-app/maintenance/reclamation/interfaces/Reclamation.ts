export default interface Reclamation {
    id: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    type: string;
    progress: string;
    priorite: string;
    availablity: Boolean;
    createdBy: string;
}
