package com.example.testspring.demo.invariants;

public enum RoleType {

    ROLE_ADMIN("ROLE_ADMIN", "Администратор всего"),
    ROLE_USER("ROLE_USER", "Роль по умолчанию");

    private String roleName;
    private String description;

    RoleType(){}
    RoleType(String roleName, String description) {
        this.roleName = roleName;
        this.description = description;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
