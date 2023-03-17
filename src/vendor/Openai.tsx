import React, { useEffect, useState } from "react";
import { Configuration, OpenAIApi } from "openai";


const configuration: Configuration = new Configuration({
  apiKey: import.meta.env.VITE_openai_apiKey,
});

const openai: OpenAIApi = new OpenAIApi(configuration);

export default openai