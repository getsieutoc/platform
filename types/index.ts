export type { ChangeEventHandler, ChangeEvent, ReactNode, ElementRef } from 'react';

export type { Metadata } from 'next';

// Do not know why export * will make nextjs complain about
// can not find module '@octokit/types'
export type { ToastId } from '@/components/chakra';

export * from '@prisma/client';

export enum HttpMethod {
  CONNECT = 'CONNECT',
  DELETE = 'DELETE',
  GET = 'GET',
  HEAD = 'HEAD',
  OPTIONS = 'OPTIONS',
  PATCH = 'PATCH',
  POST = 'POST',
  PUT = 'PUT',
  TRACE = 'TRACE',
}

// TODO: Convert types below to be proper types like upbove

export type GoogleRefreshTokenResponse = {
  access_token: string;
  expires_in: number; // NextAuth fucking changed this to expires_at
  id_token: string;
  refresh_token: string;
  scope: string;
};

export type SubscribeResponse = {
  data: {
    id: number;
    created_at: string;
    updated_at: string;
    uuid: string;
    email: string;
    name: string;
    attribs: Record<string, unknown>;
    status: 'enabled' | 'disabled' | 'blocklisted';
    lists: number[];
  };
};

export type SheetValues = {
  majorDimension: 'ROWS' | 'COLUMNS' | 'DIMENSION_UNSPECIFIED';
  range: string;
  values: string[][];
};

export type SheetData = {
  spreadsheetId: string;
  properties: {
    title: string;
    locale: string;
    defaultFormat: Record<string, unknown>;
  };
  sheets: {
    properties: {
      sheetId: number | string;
      title: string;
      index: number;
      sheetType: string;
      gridProperties: {
        rowCount: number;
        columnCount: number;
        frozenRowCount: number;
      };
    };
  }[];
  spreadsheetUrl: string;
};

export type SheetError = {
  code: number;
  config: Record<string, unknown>;
  errors: Record<string, unknown>[];
  response: Record<string, unknown>;
  status: number;
};

export type SheetResponse = SheetData | SheetError;

// ----

export type BillCycle = 'monthly' | 'yearly';

export type PriceValue = {
  value: number | string;
  currency?: '€' | '$';
};

export type PriceInfo = {
  features: string[];
  description?: string;
  ctaText?: string;
  quota?: {
    projects?: number;
    members?: number | string;
    rows?: number;
  };
};

export type Pricing = Record<BillCycle, PriceValue> & PriceInfo;

export type Preferences = {
  includeGridData?: boolean;
  qr?: {
    extraQuery?: string;
    logo?: string;
    color?: string;
  };
} | null;
