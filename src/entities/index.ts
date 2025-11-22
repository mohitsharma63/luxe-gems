/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: contactsubmissions
 * Interface for ContactFormSubmissions
 */
export interface ContactFormSubmissions {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  senderName?: string;
  /** @wixFieldType text */
  senderEmail?: string;
  /** @wixFieldType text */
  subject?: string;
  /** @wixFieldType text */
  messageContent?: string;
  /** @wixFieldType datetime */
  submissionDate?: Date | string;
  /** @wixFieldType text */
  status?: string;
}


/**
 * Collection ID: jewelryproducts
 * Interface for JewelryProducts
 */
export interface JewelryProducts {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  productName?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType image */
  mainProductImage?: string;
  /** @wixFieldType number */
  price?: number;
  /** @wixFieldType text */
  sku?: string;
  /** @wixFieldType url */
  threeDModelUrl?: string;
  /** @wixFieldType text */
  moderationStatus?: string;
  /** @wixFieldType boolean */
  isVipItem?: boolean;
  /** @wixFieldType boolean */
  isVisibleToWholesalers?: boolean;
  /** @wixFieldType boolean */
  isVisibleToRetailers?: boolean;
  /** @wixFieldType boolean */
  isVisibleToPublic?: boolean;
}


/**
 * Collection ID: notifications
 * Interface for Notifications
 */
export interface Notifications {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  title?: string;
  /** @wixFieldType text */
  content?: string;
  /** @wixFieldType datetime */
  timestamp?: Date | string;
  /** @wixFieldType text */
  targetRole?: string;
  /** @wixFieldType boolean */
  isRead?: boolean;
}
