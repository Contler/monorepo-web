import { TypeRequest } from '../constants/typeRequest';
import { AbstractRequest } from '../interfaces/abstractRequest';
import { RequestData, RequestFormData, RequestMessageData } from '../interfaces/dataRequestCreate';
import { DynamicRequest } from '../interfaces/dynamic-request';
import { DynamicRequestStatus } from '../constants/dynamic-request-status';
import { RequestMessage } from '../interfaces/RequestMessage';

export class RequestCreator {
  request: AbstractRequest;

  constructor(key: string, type: TypeRequest, requestData: RequestData) {
    this.request = {
      key,
      ...requestData,
      createAt: new Date(),
      active: true,
      guestId: requestData.guest.uid,
      hotelId: requestData.hotel.uid,
      typeRequest: type,
      status: DynamicRequestStatus.PROGRAMING,
      zone: requestData.zone ? requestData.zone : undefined,
      zoneId: requestData.zone?.uid,
    };
  }
}

export class RequestFormCreator extends RequestCreator {
  request: DynamicRequest;

  constructor(key: string, type: TypeRequest, requestData: RequestFormData) {
    super(key, type, requestData);
    this.request = {
      ...this.request,
      ...requestData,
    };
  }
}

export class RequestMessageCreator extends RequestCreator {
  request: RequestMessage;

  constructor(key: string, type: TypeRequest, requestData: RequestMessageData) {
    super(key, type, requestData);
    this.request = {
      ...this.request,
      ...requestData,
    };
  }
}
