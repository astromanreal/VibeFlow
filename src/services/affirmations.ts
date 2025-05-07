/**
 * Represents an affirmation object.
 */
export interface Affirmation {
  /**
   * The category of the affirmation.
   */
  category: string;
  /**
   * The text of the affirmation.
   */
  text: string;
  /**
   * The unique identifier for the affirmation.
   */
  id: string;
  /**
   * The audio file associated with the affirmation (optional).
   */
  audio?: string;
}

/**
 * Asynchronously retrieves a list of affirmations based on a category.
 * This is now a mock implementation. Actual affirmations data is managed
 * within the AffirmationsPage component.
 *
 * @param category The category of affirmations to retrieve.
 * @returns A promise that resolves to an empty array of Affirmation objects.
 */
export async function getAffirmationsByCategory(category: string): Promise<Affirmation[]> {
  // Mock implementation: Returns an empty array.
  // Affirmation data is now primarily managed in `src/app/affirmations/page.tsx`
  // This function can be reinstated to call an API if needed in the future.
  console.log(`Mock: Fetching affirmations for category: ${category}`);
  return [];
}

    