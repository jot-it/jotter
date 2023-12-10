import {
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/Command";
import { ChevronIcon } from "@/components/Icons";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/Popover";
import {
  $isCodeNode,
  CODE_LANGUAGE_FRIENDLY_NAME_MAP,
  getLanguageFriendlyName,
} from "@lexical/code";
import { Command } from "cmdk";
import { LexicalEditor, $getNodeByKey } from "lexical";
import { useState } from "react";

const SUPPORTED_LANGUAGES = Object.keys(CODE_LANGUAGE_FRIENDLY_NAME_MAP);

export type LanguageSelectorProps = {
  editor: LexicalEditor;
  codeNodeKey: string;
};

function LanguageSelector({ codeNodeKey, editor }: LanguageSelectorProps) {
  const [open, setOpen] = useState(false);
  const [activeLang, setActiveLang] = useState(() =>
    getInitialLanguage(editor, codeNodeKey),
  );

  // Language name must be as expected by prism. Look at the keys of CODE_LANGUAGE_FRIENDLY_NAME_MAP
  const handleLanguageSelected = (language: string) => {
    setOpen(false);
    setActiveLang(language);
    setHighlightLanguage(editor, codeNodeKey, language);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className="group inline-flex items-center rounded px-2 py-0.5 transition-colors hover:bg-slate-700 data-[state=open]:bg-slate-700"
          role="combobox"
          aria-expanded={open}
        >
          {activeLang
            ? getLanguageFriendlyName(activeLang)
            : "Select language..."}
          <ChevronIcon className="ml-1 transition-transform group-data-[state=open]:rotate-180" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="!w-48 overflow-hidden !p-0 dark:border-slate-600">
        <Command className="z-20 flex-1 bg-white text-gray-700 shadow-md dark:bg-slate-700 dark:text-inherit">
          <CommandInput placeholder="Search a language..." />
          <CommandEmpty>No language found</CommandEmpty>
          <CommandList>
            {SUPPORTED_LANGUAGES.map((lang) => (
              <CommandItem key={lang} onSelect={handleLanguageSelected}>
                {getLanguageFriendlyName(lang)}
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

function getInitialLanguage(editor: LexicalEditor, key: string) {
  let language: string | null | undefined;
  editor.getEditorState().read(() => {
    const node = $getCodeNodeOrThrow(key);
    language = node.getLanguage();
  });
  return language;
}

function setHighlightLanguage(
  editor: LexicalEditor,
  key: string,
  language: string,
) {
  editor.update(() => {
    const node = $getCodeNodeOrThrow(key);
    node.setLanguage(language);
  });
}

function $getCodeNodeOrThrow(key: string) {
  const node = $getNodeByKey(key);
  if (!$isCodeNode(node)) {
    throw new Error(`The key ${key} does not correspond to a valid CodeNode`);
  }
  return node;
}

export default LanguageSelector;
