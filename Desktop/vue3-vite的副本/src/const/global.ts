import { constToOptions, ValueOf } from '@/utils';
import { constModel, optionModel } from '@/const/types';

enum roleTypeVal {
  user,
  admin,
}

const roleTypeText = {
  [roleTypeVal.admin]: '管理员',
  [roleTypeVal.user]: '普通成员'
}

const roleApiValueMap = {
  [roleTypeVal.admin]: true,
  [roleTypeVal.user]: false
}

export const ROLE_TYPE: constModel<typeof roleTypeVal, typeof roleTypeText> = {
  val: roleTypeVal,
  text: roleTypeText,
  apiVal: roleApiValueMap,
  options: constToOptions<typeof roleTypeText, ValueOf<typeof roleTypeVal>>(roleTypeText, [
    roleTypeVal.admin,
    roleTypeVal.user
  ]) as optionModel[]
}