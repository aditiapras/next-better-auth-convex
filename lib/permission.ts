import { createAccessControl } from "better-auth/plugins/access";
import { defaultStatements, adminAc } from "better-auth/plugins/admin/access";

const statement = {
  ...defaultStatements,
  orgs: ["create", "read", "update", "delete"],
  teams: ["create", "read", "update", "delete"],
  users: ["create", "read", "update", "delete"],
  settings: ["read", "update"], 
} as const;

const ac = createAccessControl(statement);

export const root = ac.newRole({
  orgs: ["create", "read", "update", "delete"],
  teams: ["create", "read", "update", "delete"],
  users: ["create", "read", "update", "delete"],
  settings: ["read", "update"],
  ...adminAc.statements,
});

export const admin = ac.newRole({
  orgs: ["read"], // no create/delete org
  teams: ["create", "read", "update", "delete"], // no delete team
  users: ["create", "read", "update", "delete"],
  settings: ["read", "update"],
});

export const teamAdmin = ac.newRole({
  orgs: [], // no access page orgs
  teams: ["read"], // no access page teams
  users: ["create", "read", "update", "delete"],
  settings: ["read", "update"],
});

export const user = ac.newRole({
  orgs: [],
  teams: [],
  users: [],
  settings: ["read", "update"],
});

export { ac };