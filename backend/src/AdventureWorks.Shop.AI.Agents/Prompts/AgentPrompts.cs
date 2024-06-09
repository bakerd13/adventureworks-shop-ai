using AdventureWorks.Shop.AI.Core.Resources;

namespace AdventureWorks.Shop.AI.Agents.Prompts
{
    public class AgentPrompts : EmbeddedTextResource
    {
        private static AgentPrompts Instance { get; }

        static AgentPrompts()
        {
            Instance = new AgentPrompts();
        }

        public static string ControllerPrompt => Instance.GetResourceContent("ControllerPrompt");

        public static string ChristmasPrompt => Instance.GetResourceContent("ChristmasPrompt");

        public static string SafetyPrompt => Instance.GetResourceContent("SafetyPrompt");
    }
}
