#version 330 core

in vec4 vertexColor;
in vec3 vertexNormal;
in vec3 vertexPosition;
in vec2 texCoord;  // Added

out vec4 FragColor;

struct DirectionalLight {
    vec3 ambient ;
    vec3 diffuse;
    vec3 specular;
    vec3 direction;
};


uniform DirectionalLight dirLight;
uniform vec3 eyePos;
uniform mat4 lightPos;
uniform sampler2D basicTexture;  // Added

// TEXTURED SHADER

vec3 roomLight()
{
    vec3 sampledTexture = texture(basicTexture, texCoord).rgb;
    vec3 objectColor = vertexColor.xyz * sampledTexture;


    // Ambient lighting
    float LightBrightness = .85;
    vec3 ambient = LightBrightness * vec3(1.0f, 1.0f, 1.0f);

    // Diffuse lighting
    vec3 norm = normalize(vertexNormal);
    vec3 lightDir = normalize(vec3(0.0f, 10.0f, -10.0f));
    float diff = max(dot(norm, lightDir), 0.0);
    vec3 diffuse = diff * vec3(0.95f, 0.95f, .95f);

    // Specular lighting
    float specularStrength = 1.5;
    vec3 viewDir = normalize(vec3(-5.f, 15.0f, -0.0f) - vertexPosition);

    vec3 reflectDir = reflect(-lightDir, norm);

    float shininess = 100.0;
    float spec = pow(max(dot(viewDir, reflectDir), 0.0), shininess);
    vec3 specular = specularStrength * spec * vec3(1.0f, 1.0f, 1.0f);

    vec3 finalColor = (ambient + diffuse + specular) ;
    FragColor = vec4(finalColor, 1.0);

    return FragColor.rgb;
}

vec3 blueLight()
{
    vec3 sampledTexture = texture(basicTexture, texCoord).rgb;
    vec3 objectColor = vertexColor.xyz * sampledTexture;


    // Ambient lighting
    float LightBrightness = .25;
    vec3 ambient = LightBrightness * vec3(1.0f, 1.0f, 1.0f);

    // Diffuse lighting
    vec3 norm = normalize(vertexNormal);
    vec3 lightDir = normalize(vec3(-4.0f, 10.0f, -6.0f));
    float diff = max(dot(norm, lightDir), 0.0);
    vec3 diffuse = diff * vec3(0.95f, 0.99f, .95f);

    // Specular lighting
    float specularStrength = 2.75;
    vec3 viewDir = normalize(vec3(8.f, 8.0f, 10.0f) - vertexPosition);

    vec3 reflectDir = reflect(-lightDir, norm);

    float shininess = 200.0;
    float spec = pow(max(dot(viewDir, reflectDir), 0.0), shininess);
    vec3 specular = specularStrength * spec * vec3(0.0f, 0.00f, 1.0f);

    vec3 finalColor = (ambient + diffuse + specular) ;
    FragColor = vec4(finalColor, 1.0);

    return FragColor.rgb;
}


void main()
{

    vec3 sampledTexture = texture(basicTexture, texCoord).rgb; 
    vec3 objectColor = vertexColor.xyz * sampledTexture; 

    // Base color
    vec3 baseColor = vertexColor.rgb * sampledTexture;

    // Ambient lighting
    float LightBrightness = .75;
    vec3 ambient = LightBrightness  * baseColor;

    // Diffuse lighting
    vec3 norm = normalize(vertexNormal);
    vec3 lightDir = normalize(vec3(0.0f, 10.0f, -10.0f));
    float diff = max(dot(norm, lightDir), 0.0);
    vec3 diffuse = diff * vec3(0.96f, 0.95f, .95f);

    // Specular lighting
    float specularStrength = 1.;
    vec3 viewDir = normalize(eyePos - vertexPosition);
    vec3 reflectDir = reflect(-lightDir, norm);

    float shininess = 180.0;
    float spec = pow(max(dot(viewDir, reflectDir), 0.0), shininess);
    vec3 specular = specularStrength * spec * vec3(.9f, .9, .7f);

    vec3 finalColor = ambient + diffuse + specular + objectColor;


    vec3 roomLighting = roomLight();
    vec3 roomLighting2 = blueLight();

    finalColor = (finalColor * roomLighting * roomLighting2) * baseColor;
    FragColor = vec4(finalColor, 1.0);
}










