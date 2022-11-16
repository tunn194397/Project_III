import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import * as CryptoJS from 'crypto-js';
import { SelectQueryBuilder } from 'typeorm';

export function nowInMillis(): number {
  return Date.now();
}

// Alias for nowInMillis
export function now(): number {
  return nowInMillis();
}

export function nowInSeconds(): number {
  return (nowInMillis() / 1000) | 0;
}

export function addHttps(url: string) {
  if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
    url = 'https://' + url;
  }
  return url;
}

export function checkIPaginationOptions(options: IPaginationOptions): boolean {
  if (options.limit == 0 || options.page == 0) {
    return false;
  }
  return true;
}

export function encrypt(data: string) {
  return CryptoJS.MD5(data).toString();
}

export function convertToString(value: any) {
  return (typeof value === 'string') ? value : '';
}

export function convertToObject(value: any) {
  return (typeof value === 'object') ? value : {};
}

export function getArrayPagination<T>(totalItems: any[], options: any): Pagination<T> {
  const { limit, page } = options;

  const selectedItems = totalItems.slice((page - 1) * limit, page * limit);
  const pagination = {
    totalItems: totalItems.length,
    itemCount: selectedItems.length,
    itemsPerPage: limit,
    totalPages: Math.ceil(totalItems.length / limit),
    currentPage: page,
  };

  return new Pagination(selectedItems, pagination, null);
}

export function existValueInEnum(type: any, value: any): boolean {
  return (
    Object.keys(type)
      .filter((k) => isNaN(Number(k)))
      .filter((k) => type[k] === value).length > 0
  );
}

export function toTimestamp(strDate) {
  var datum = Date.parse(strDate);
  return datum;
}

export function toDateTime(time) {
  var date = new Date(time * 1);
  return formatDate0(date.getDate()) + "-" + formatDate0(date.getMonth()) + "-" + date.getFullYear() + " " + formatDate0(date.getHours()) + ":" + formatDate0(date.getMinutes());
}

function formatDate0(n) {
  if (n < 10) return "0" + n;
  return n;
}

export function weekOfYear(d: Date) {
  var dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
  return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1)/7)
};

export function getFirstDayOfWeek(d: Date) {
  d.setDate(d.getDate() - d.getDay() + 1);

  let monday = new Date(d.toDateString());

  return monday;
};