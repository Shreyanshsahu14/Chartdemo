export const data1= [
    {
      "userId": 1,
      "username": "johndoe",
      "email": "johndoe@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "title": "Mr.",
      "tenantCode": "ABC123",
      "tenantName": "Tenant One",
      "defaultRegion": "US-East",
      "defaultTimezone": "America/New_York",
      "roles": [
        {
          "roleId": 1,
          "roleName": "Admin",
          "description": "Administrator with full access"
        },
        {
          "roleId": 2,
          "roleName": "Manager",
          "description": "Manager with limited access"
        }
      ],
      "regions": [
        {
          "regionCode": "US",
          "regionName": "United States",
          "countryCode": "US"
        },
        {
          "regionCode": "CA",
          "regionName": "Canada",
          "countryCode": "CA"
        }
      ]
    },
    {
      "userId": 2,
      "username": "janedoe",
      "email": "janedoe@example.com",
      "firstName": "Jane",
      "lastName": "Doe",
      "tenantCode": "XYZ789",
      "tenantName": "Tenant Two",
      "roles": [
        {
          "roleId": 3,
          "roleName": "Editor",
          "description": "Editor with access to modify content"
        }
      ],
      "regions": [
        {
          "regionCode": "US",
          "regionName": "United States",
          "countryCode": "US"
        }
      ]
    },
    {
      "userId": 3,
      "username": "alice",
      "email": "alice@example.com",
      "firstName": "Alice",
      "lastName": "Smith",
      "tenantCode": "DEF456",
      "tenantName": "Tenant Three",
      "defaultRegion": "APAC",
      "defaultTimezone": "Asia/Tokyo",
      "roles": [
        {
          "roleId": 2,
          "roleName": "Manager",
          "description": "Manager with limited access"
        }
      ],
      "regions": [
        {
          "regionCode": "JP",
          "regionName": "Japan",
          "countryCode": "JP"
        },
        {
          "regionCode": "US",
          "regionName": "United States",
          "countryCode": "US"
        }
      ]
    },
    {
      "userId": 4,
      "username": "bobbuilder",
      "email": "bobbuilder@example.com",
      "firstName": "Bob",
      "lastName": "Builder",
      "tenantCode": "GHI012",
      "tenantName": "Tenant Four",
      "roles": [
        {
          "roleId": 4,
          "roleName": "Viewer",
          "description": "Viewer with read-only access"
        }
      ],
      "regions": [
        {
          "regionCode": "IN",
          "regionName": "India",
          "countryCode": "IN"
        },
        {
          "regionCode": "CA",
          "regionName": "Canada",
          "countryCode": "CA"
        }
      ]
    },
    {
      "userId": 5,
      "username": "charliebrown",
      "email": "charliebrown@example.com",
      "firstName": "Charlie",
      "lastName": "Brown",
      "tenantCode": "JKL345",
      "tenantName": "Tenant Five",
      "defaultRegion": "EU-West",
      "defaultTimezone": "Europe/Berlin",
      "roles": [
        {
          "roleId": 5,
          "roleName": "Contributor",
          "description": "Contributor with limited content access"
        },
        {
          "roleId": 3,
          "roleName": "Editor",
          "description": "Editor with access to modify content"
        }
      ],
      "regions": [
        {
          "regionCode": "DE",
          "regionName": "Germany",
          "countryCode": "DE"
        },
        {
          "regionCode": "US",
          "regionName": "United States",
          "countryCode": "US"
        }
      ]
    },
    {
      "userId": 6,
      "username": "emilyrose",
      "email": "emilyrose@example.com",
      "firstName": "Emily",
      "lastName": "Rose",
      "tenantCode": "MNO678",
      "tenantName": "Tenant Six",
      "roles": [
        {
          "roleId": 2,
          "roleName": "Manager",
          "description": "Manager with limited access"
        },
        {
          "roleId": 5,
          "roleName": "Contributor",
          "description": "Contributor with limited content access"
        }
      ],
      "regions": [
        {
          "regionCode": "GB",
          "regionName": "United Kingdom",
          "countryCode": "GB"
        },
        {
          "regionCode": "IN",
          "regionName": "India",
          "countryCode": "IN"
        }
      ]
    }
  ]
  
  export const data2 = [
    {
      "productId": 101,
      "productName": "Wireless Bluetooth Headphones",
      "category": "Electronics",
      "brand": "SoundMaster",
      "price": 129.99,
      "stockQuantity": 150,
      "manufacturer": {
        "companyId": "M001",
        "companyName": "AudioTech Ltd",
        "location": "Shenzhen, China"
      },
      "specifications": {
        "color": "Black",
        "batteryLife": "20 hours",
        "noiseCancellation": true
      },
      "releaseDate": "2023-03-15",
      "ratings": [
        {
          "userId": "U201",
          "rating": 4.5,
          "review": "Excellent sound quality"
        },
        {
          "userId": "U202",
          "rating": 4.0,
          "review": "Comfortable fit"
        }
      ]
    },
    {
      "productId": 102,
      "productName": "Organic Cotton T-Shirt",
      "category": "Apparel",
      "brand": "EcoWear",
      "price": 29.99,
      "stockQuantity": 85,
      "manufacturer": {
        "companyId": "M002",
        "companyName": "GreenTextiles Inc",
        "location": "Portland, USA"
      },
      "specifications": {
        "color": "White",
        "size": "Medium",
        "material": "100% Organic Cotton"
      },
      "releaseDate": "2023-01-10",
      "ratings": [
        {
          "userId": "U203",
          "rating": 4.8,
          "review": "Super soft fabric"
        }
      ]
    },
    {
      "productId": 103,
      "productName": "Smart Fitness Tracker",
      "category": "Wearables",
      "brand": "FitTech",
      "price": 89.95,
      "stockQuantity": 200,
      "manufacturer": {
        "companyId": "M003",
        "companyName": "HealthGadgets Co",
        "location": "Seoul, South Korea"
      },
      "specifications": {
        "color": "Midnight Blue",
        "waterResistant": true,
        "heartRateMonitor": true
      },
      "releaseDate": "2023-05-20",
      "ratings": [
        {
          "userId": "U204",
          "rating": 4.2,
          "review": "Accurate step counting"
        },
        {
          "userId": "U205",
          "rating": 3.9,
          "review": "Battery life could be better"
        }
      ]
    },
    {
      "productId": 104,
      "productName": "Stainless Steel Cookware Set",
      "category": "Home & Kitchen",
      "brand": "ChefPro",
      "price": 249.99,
      "stockQuantity": 45,
      "manufacturer": {
        "companyId": "M004",
        "companyName": "KitchenCraft International",
        "location": "Milan, Italy"
      },
      "specifications": {
        "color": "Silver",
        "pieces": 10,
        "inductionCompatible": true
      },
      "releaseDate": "2022-11-30",
      "ratings": [
        {
          "userId": "U206",
          "rating": 4.7,
          "review": "Professional quality"
        }
      ]
    },
    {
      "productId": 105,
      "productName": "Electric Coffee Grinder",
      "category": "Appliances",
      "brand": "BrewMaster",
      "price": 59.99,
      "stockQuantity": 120,
      "manufacturer": {
        "companyId": "M005",
        "companyName": "CoffeeGear Ltd",
        "location": "Zurich, Switzerland"
      },
      "specifications": {
        "color": "Red",
        "wattage": "150W",
        "capacity": "200g"
      },
      "releaseDate": "2023-04-05",
      "ratings": [
        {
          "userId": "U207",
          "rating": 4.4,
          "review": "Consistent grind size"
        },
        {
          "userId": "U208",
          "rating": 4.6,
          "review": "Easy to clean"
        }
      ]
    }
  ];